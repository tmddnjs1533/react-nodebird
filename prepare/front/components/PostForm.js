import React, { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Upload, Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addPost, postState } from "../reducers/post";

const PostForm = () => {
  const { control, handleSubmit, setValue } = useForm();
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

  const handleChange = useCallback((info) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(fileList);
    // setValue("file", fileList);
  }, []);

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
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

      <div>
        <Upload onChange={handleChange} fileList={fileList}>
          <Button icon={<UploadOutlined />}>이미지 업로드</Button>
        </Upload>
        <Button
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          onClick={handleSubmit(onSubmit)}
        >
          짹짹
        </Button>
      </div>
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
    </form>
  );
};

export default PostForm;
