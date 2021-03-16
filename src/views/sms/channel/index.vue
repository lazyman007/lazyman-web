<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="通道名称" prop="channelName">
        <el-input
          v-model="queryParams.channelName"
          placeholder="请输入通道名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="厂商" prop="vendorCode">
        <el-select
          v-model="queryParams.vendorCode"
          placeholder="厂商"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in vendorOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="短信类型" prop="smsType">
        <el-select
          v-model="queryParams.smsType"
          placeholder="短信类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in smsTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select
          v-model="queryParams.state"
          placeholder="通道状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in stateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['sms:channel:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['sms:channel:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['sms:channel:remove']"
          >删除</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['sms:channel:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="channelList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="通道编号" align="center" prop="id" />
      <el-table-column label="通道名称" align="center" prop="channelName" />
      <el-table-column
        label="短信类型"
        align="center"
        prop="smsType"
        :formatter="smsTypeFormat"
      />
      <el-table-column
        label="厂商"
        align="center"
        prop="vendorCode"
        :formatter="vendorFormat"
      />
      <el-table-column label="优先级" align="center" prop="priority" />
      <el-table-column
        label="状态"
        align="center"
        prop="state"
        :formatter="stateFormat"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sms:channel:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['sms:channel:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNo"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改通道对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="通道名称" prop="channelName">
          <el-input v-model="form.channelName" placeholder="请输入通道名称" />
        </el-form-item>
        <el-form-item label="厂商" prop="vendorCode">
          <el-select
            v-model="form.vendorCode"
            placeholder="厂商"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in vendorOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="短信类型" prop="smsType">
          <el-select
            v-model="form.smsType"
            placeholder="短信类型"
            clearable
            size="small"
          >
            <el-option
              v-for="dict in smsTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Api地址" prop="apiUrl">
          <el-input v-model="form.apiUrl" placeholder="请输入Api地址" />
        </el-form-item>
        <el-form-item label="Access key" prop="accessKey">
          <el-input v-model="form.accessKey" placeholder="请输入Access key" />
        </el-form-item>
        <el-form-item label="Secret key" prop="secretKey">
          <el-input v-model="form.secretKey" placeholder="请输入Secret key" />
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-input-number
            v-model="form.priority"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="通道状态" prop="state">
          <el-radio-group v-model="form.state">
            <el-radio
              v-for="dict in stateOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
              >{{ dict.dictLabel }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listChannel,
  getChannel,
  delChannel,
  addChannel,
  updateChannel,
} from "@/api/sms/channel";

export default {
  name: "SmsChannel",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 通道表格数据
      channelList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      stateOptions: [],
      vendorOptions: [],
      smsTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        channelName: undefined,
        smsType: undefined,
        vendorCode: undefined,
        state: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        channelName: [
          { required: true, message: "通道名称不能为空", trigger: "blur" },
        ],
        vendorCode: [
          { required: true, message: "厂商不能为空", trigger: "blur" },
        ],
        smsType: [
          { required: true, message: "短信类型不能为空", trigger: "blur" },
        ],
        priority: [
          { required: true, message: "优先级不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_normal_disable").then((res) => {
      this.stateOptions = res;
    });
    this.getDicts("sms_type").then((res) => {
      this.smsTypeOptions = res;
    });
    this.getDicts("sms_vendor").then((res) => {
      this.vendorOptions = res;
    });
  },
  methods: {
    /** 查询通道列表 */
    getList() {
      this.loading = true;
      listChannel(this.queryParams).then((res) => {
        console.log(res)
        this.channelList = res.records;
        this.total = res.total;
        this.loading = false;
      });
    },
    // 通道状态字典翻译
    stateFormat(row, column) {
      return this.selectDictLabel(this.stateOptions, row.state);
    },
    vendorFormat(row, column) {
      return this.selectDictLabel(this.vendorOptions, row.vendorCode);
    },
    smsTypeFormat(row, column) {
      return this.selectDictLabel(this.smsTypeOptions, row.smsType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        channelName: undefined,
        vendorCode: undefined,
        smsType: undefined,
        apiUrl: undefined,
        accessKey: undefined,
        secretKey: undefined,
        priority: 0,
        state: "true",
        remark: undefined,
      };
      this.resetForm("form");
      this.dateRange = [];
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加通道";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getChannel(id).then((res) => {
        this.form = res;
        this.open = true;
        this.title = "修改通道";
        this.form.state = this.form.state + "";
        this.form.smsType = this.form.smsType + "";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateChannel(this.form.id, this.form).then((res) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChannel(this.form).then((res) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const channelIds = row.id || this.ids;
      this.$confirm(
        '是否确认删除通道编号为"' + channelIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delChannel(channelIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "sms/channel/export",
        {
          ...this.queryParams,
        },
        `channel_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>