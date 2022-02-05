import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addPost, postState } from "../reducers/post";
import styled from "styled-components";

const StyledLabel = styled.label`
  border: 1px solid #ccc;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    border-color: #1890ff;
  }
`;

const StyledForm = styled.form`
  display: block;
  height: 86px;
  margin-bottom: 20px;
`;

const PostForm = () => {
  const { register, control, handleSubmit, setValue } = useForm();
  const { imagePaths, postAdded } = useSelector(postState);
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const onSubmit = useCallback((data) => {
    setValue("file", fileList);
    dispatch(addPost);
    console.log(data);
  }, []);
  useEffect(() => {
    if (postAdded) {
      setValue("text", "");
    }
  }, []);

  return (
    <StyledForm encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="text"
        render={({ field }) => (
          <Input.TextArea
            {...field}
            maxLength={140}
            placeholder="어떤 신기한 일이 있었나요?"
          />
        )}
      />
      <div style={{ float: "left" }}>
        <input type="file" id="file" multiple hidden {...register("file")} />
        <StyledLabel htmlFor="file">
          <UploadOutlined />
        </StyledLabel>
        <div>
          {imagePaths.map((v) => {
            return (
              <div key={v} style={{ display: "inline-block" }}>
                <img
                  src={"http://localhost:3065/" + v}
                  style={{ width: "200px" }}
                  alt={v}
                />
                <div>
                  <Button>제거</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        type="primary"
        style={{ float: "right" }}
        htmlType="submit"
        onClick={handleSubmit(onSubmit)}
      >
        짹짹
      </Button>
    </StyledForm>
  );
};

export default PostForm;
