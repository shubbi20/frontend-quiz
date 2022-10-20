import { Checkbox, Col, Radio, RadioChangeEvent, Space } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useState } from "react";
import styled from "styled-components";
import { TypeQues } from "../pages/TakeQuiz";

interface props {
  question: TypeQues;
  updateAnswer: (questionNo: number, value: string[]) => void;
}

export const TakeQuizSection: React.FC<props> = ({
  question,
  updateAnswer,
}) => {
  const [value, setValue] = useState("1");

  const onRadioChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    updateAnswer(question.questionNo, [e.target.value]);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    updateAnswer(question.questionNo, checkedValues as string[]);
  };

  return (
    <Wrapper>
      <h2>
        {`Q${question.questionNo}: `} {question.ques}
      </h2>
      {question.type === "single" ? (
        <Radio.Group onChange={onRadioChange} value={value}>
          <Space direction="vertical">
            {question &&
              question.options.map((option, index) => {
                return (
                  <Col span={8} key={index}>
                    <Radio value={`option${index + 1}`}>{option}</Radio>;
                  </Col>
                );
              })}
          </Space>
        </Radio.Group>
      ) : (
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
          <Space direction="vertical">
            {question &&
              question.options.map((option, index) => {
                return (
                  <Col span={8} key={index}>
                    <Checkbox value={`option${index + 1}`}>{option}</Checkbox>
                  </Col>
                );
              })}
          </Space>
        </Checkbox.Group>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #5f9ea0;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  background-color: #e0ffff;
  border-radius: 10px;
`;
