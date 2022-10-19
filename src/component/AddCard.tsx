import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";

interface props {
  Question: string;
  option: string[];
  answer: string[];
  questionNo: number;
  updateQuestion: (questionNo: number, value: string) => void;
  addOrDeleteOptions: (questionNo: number, action: string) => void;
  updateAnswer: (questionNo: number, value: string[]) => void;
  updateOption: (
    questionNo: number,
    value: string,
    optionIndex: number
  ) => void;
}

const AddQuesCard: React.FC<props> = ({
  Question,
  option,
  answer,
  questionNo,
  updateQuestion,
  addOrDeleteOptions,
  updateAnswer,
  updateOption,
}) => {
  const [children, setChildren] = useState<any[]>([]);
  const { Option } = Select;
  useEffect(() => {
    let arr: any[] = [];
    for (let i = 0; i < option.length; i++) {
      arr.push(
        <Option key={`option${i + 1}`} label={`option${i + 1}`}>{`option${
          i + 1
        }`}</Option>
      );
      setChildren(arr);
    }
  }, [option]);

  const handleChange = (value: string[]) => {
    updateAnswer(questionNo, value);
  };

  return (
    <div
      style={{
        border: "1px solid grey",
        margin: "1rem auto",
        padding: "10px",
      }}
    >
      <Input
        placeholder="Question"
        size="middle"
        value={Question}
        onChange={(e) => {
          updateQuestion(questionNo, e.target.value);
        }}
        style={{ marginBottom: "10px" }}
      />
      {option.length > 0 &&
        option.map((opt, index) => {
          return (
            <Input
              value={opt}
              placeholder="options"
              key={index}
              size="small"
              onChange={(e) => updateOption(questionNo, e.target.value, index)}
            />
          );
        })}

      <div style={{ display: "flex", gap: "2%", margin: "0.5rem" }}>
        {option.length < 5 ? (
          <Button
            type="ghost"
            size="small"
            onClick={() => addOrDeleteOptions(questionNo, "Add-Option")}
          >
            <PlusOutlined />
          </Button>
        ) : null}
        {option.length > 2 ? (
          <Button
            type="ghost"
            size="small"
            onClick={() => addOrDeleteOptions(questionNo, "Delete-Option")}
          >
            <MinusOutlined />
          </Button>
        ) : null}
      </div>

      <Select
        mode="multiple"
        allowClear
        defaultValue={answer}
        style={{ width: "100%" }}
        placeholder="Please select Answer"
        onChange={handleChange}
      >
        {children}
      </Select>
    </div>
  );
};

export default AddQuesCard;
