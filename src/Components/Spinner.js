import { Spin } from "antd";
import React, { useContext } from "react";
import chatContext from "../context/chatContext"
import { LoadingOutlined } from "@ant-design/icons";

function Spinner() {
  const context =useContext(chatContext)
  const{spin}=context
  return (
    <>
      <Spin
        className="custom-spinner"
        spinning={spin}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 54,
              margin:'auto'
            }}
            spin
          />
        }
      />
    </>
  );
}

export default Spinner;
