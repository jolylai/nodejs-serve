import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer, Tag } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import request from "umi-request";

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    valueType: "indexBorder",
    width: 72
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "邮箱",
    dataIndex: "email",
    copyable: true,
    ellipsis: true
  },
  {
    title: "联系方式",
    dataIndex: "mobile"
  },
  // {
  //   title: "年龄",
  //   dataIndex: "age"
  // },
  // {
  //   title: "地址",
  //   dataIndex: "address"
  // },
  // {
  //   title: "性别",
  //   dataIndex: "gender",
  //   valueEnum: {
  //     femel: {
  //       text: "女"
  //     },
  //     male: {
  //       text: "男"
  //     },
  //     secrecy: {
  //       text: "保密"
  //     }
  //   }
  // },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    valueType: "dateTime",
    hideinSerch: true
  },
  {
    title: "更新时间",
    dataIndex: "updatedAt",
    valueType: "dateTime",
    hideinSerch: true
  },
  {
    title: "操作",
    valueType: "option",
    render: (text, row, _, action) => [
      <a href={row.html_url} target="_blank" rel="noopener noreferrer">
        查看
      </a>,
      <TableDropdown
        onSelect={() => action.reload()}
        menus={[
          {
            key: "copy",
            name: "复制"
          },
          {
            key: "delete",
            name: "删除"
          }
        ]}
      />
    ]
  }
];
export default () => {
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Drawer width={600} onClose={() => setVisible(false)} visible={visible}>
        <Button
          style={{
            margin: 8
          }}
          onClick={() => {
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          刷新
        </Button>
        <Button
          onClick={() => {
            if (actionRef.current) {
              actionRef.current.reset();
            }
          }}
        >
          重置
        </Button>
        <ProTable
          columns={columns}
          type="form"
          onSubmit={params => console.log(params)}
        />
      </Drawer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => {
          const { list, total } = await request(
            "http://127.0.0.1:7001/api/user",
            {
              params,
              credentials: "include"
            }
          );

          return {
            data: list,
            page: params.current,
            success: true,
            total: total
          };
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="用户"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>
        ]}
      />
    </>
  );
};
