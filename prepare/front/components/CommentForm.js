import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { userState } from "../reducers/user";
const StyledForm = styled.form`
  display: block;
  min-height: 86px;
  position: relative;
`;
const CommentForm = ({ postId }) => {
  const { handleSubmit, control } = useForm();
  const { me } = useSelector(userState);
  const onSubmit = useCallback((data) => {
    console.log(postId, data);
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="text"
        render={({ field }) => (
          <Input.TextArea
            {...field}
            rows={4}
            placeholder="어떤 신기한 일이 있었나요?"
            style={{ borderTop: 0 }}
          />
        )}
      />
      <Button
        style={{ position: "absolute", right: 0, bottom: -40 }}
        type="primary"
        htmlType="submit"
        onClick={handleSubmit(onSubmit)}
      >
        삐약
      </Button>
    </StyledForm>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.number,
};

export default CommentForm;
