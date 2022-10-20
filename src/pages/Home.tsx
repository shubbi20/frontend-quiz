import { Button, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublishSection } from "../component/PublishSection";
import { getPublishQuizApi } from "../utils/apiUtil/quizApi";

import { UserAuthContext } from "../utils/user-auth-context";

export const Home = () => {
  const navigate = useNavigate();
  const token = useContext(UserAuthContext);
  const [publishQuiz, setPublishQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (token) {
      const [data, error] = await getPublishQuizApi(token);
      if (data) {
        setLoading(false);
        setPublishQuiz(data.data);
      } else {
        setLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spin spinning={loading}>
      <div>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: "3rem" }}
          onClick={() => navigate("/AddQuiz/0")}
        >
          Add Quiz
        </Button>
        {publishQuiz.length > 0 &&
          publishQuiz.map((quiz) => {
            return (
              <PublishSection
                permalink={quiz.permalink}
                quizTitle={quiz.title}
                quizId={quiz.id}
                key={quiz.id}
                fetchData={fetchData}
              />
            );
          })}
      </div>
    </Spin>
  );
};

export default Home;
