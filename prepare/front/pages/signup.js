import React, { useCallback, useMemo } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import * as PropTypes from "prop-types";
import { Checkbox } from "antd";

function TextInput({ value }) {
  return <div>{value}</div>;
}

TextInput.propTypes = { value: PropTypes.string };

const Signup = () => {
  const {
    getValues,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      userId: "",
      userNick: "",
      userPassword: "",
      userPasswordCheck: "",
      userTerm: false,
    },
  });
  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);
  const requiredTrueRule = useMemo(() => ({ required: true }), []);
  const passwordCheckRule = useMemo(
    () => ({
      required: true,
      validate: {
        matchesPreviousPassword: (value) => {
          const { userPassword } = getValues();
          return userPassword === value || "비밀번호가 일치하지 않습니다.";
        },
      },
    }),
    [],
  );
  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 10 }}>
          <TextInput value="135135" />
          <div>
            <label htmlFor="userId">아이디</label>
            <br />
            <Controller
              control={control}
              name="userId"
              rules={requiredTrueRule}
              render={({ field }) => <Input {...field} />}
            />
          </div>
          <div>
            <label htmlFor="userNick">닉네임</label>
            <br />
            <Controller
              control={control}
              name="userNick"
              rules={requiredTrueRule}
              render={({ field }) => <Input {...field} />}
            />
          </div>
          <div>
            <label htmlFor="userPassword">비밀번호</label>
            <br />
            <Controller
              control={control}
              name="userPassword"
              rules={requiredTrueRule}
              render={({ field }) => <Input type="password" {...field} />}
            />
          </div>
          <div>
            <label htmlFor="userPasswordCheck">비밀번호체크</label>
            <br />
            <Controller
              control={control}
              name="userPasswordCheck"
              rules={passwordCheckRule}
              render={({ field }) => <Input type="password" {...field} />}
            />
            {errors.userPasswordCheck && (
              <div style={{ color: "red" }}>
                {errors.userPasswordCheck.message}
              </div>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="userTerm"
              rules={requiredTrueRule}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  checked={value}
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                >
                  제로초 말을 잘 들을 것을 동의합니다.
                </Checkbox>
              )}
            />
            {errors.userTerm && (
              <div style={{ color: "red" }}>
                {errors.userTerm.message || "약관에 동의하셔야 합니다."}
              </div>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </div>
        </form>
      </AppLayout>
    </>
  );
};

export default Signup;
