import { Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { DraftCard } from "../component/DraftCard";
import { getQuizApi } from "../utils/apiUtil/quizApi";
import { UserAuthContext } from "../utils/user-auth-context";

export const Draft = () => {
  const token = useContext(UserAuthContext);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (token) {
      const [data, error] = await getQuizApi(token);
      if (data) {
        setQuizData(data.data);
        setLoading(false);
      } else {
        console.log(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spin spinning={loading}>
      <div>
        {quizData.length > 0 ? (
          quizData.map((current) => {
            return (
              <DraftCard
                fetchData={fetchData}
                permalink={current.permalink}
                quizQuestions={current.questions}
                quizTitle={current.title}
                id={current.id}
                key={current.id}
              />
            );
          })
        ) : (
          <h2>No data to show</h2>
        )}
      </div>
    </Spin>
  );
};
