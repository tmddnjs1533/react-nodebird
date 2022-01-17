import React, { useCallback, useMemo } from "react";
import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers/user";
const FormWrapper = styled.form`
  padding: 18px;
`;
const LoginForm = () => {
  const dispatch = useDispatch();
  const { control, getValues, handleSubmit } = useForm({
    defaultValues: {
      userId: "",
      userPassword: "",
    },
  });
  const style = useMemo(() => ({ marginTop: 10 }), []);
  const onSubmit = useCallback(() => {
    dispatch(loginAction(getValues()));
  }, []);
  const requiredTrueRule = useMemo(() => ({ required: true }), []);

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Controller
          control={control}
          name="userId"
          rules={requiredTrueRule}
          render={({ field }) => <Input {...field} />}
        />
      </div>
      <div>
        <label htmlFor="user-pw">패스워드</label>
        <br />
        <Controller
          control={control}
          name="userPassword"
          rules={requiredTrueRule}
          render={({ field }) => <Input type="password" {...field} />}
        />
      </div>
      <div style={style}>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
