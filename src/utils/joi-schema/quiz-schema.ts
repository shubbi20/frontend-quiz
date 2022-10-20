import Joi from "joi";

export const quizSchema = Joi.object().keys({
  title: Joi.string().trim().min(3).required(),
  questions: Joi.array()
    .options({ abortEarly: true })
    .items({
      questionNo: Joi.number().min(1).required(),
      ques: Joi.string().trim().min(5).max(200).required().label("question"),
      answer: Joi.array()
        .items(Joi.string().trim().lowercase().required())
        .min(1)
        .unique()
        .required()
        .label("answer"),
      options: Joi.array()
        .items(
          Joi.string().trim().min(1).lowercase().required(),
          Joi.string().min(1).lowercase()
        )
        .required()
        .unique()
        .label("options"),
      type: Joi.string().optional(),
    })
    .max(10)
    .min(1)
    .unique("ques")
    .required(),
});

export const answerSchema = Joi.array()
  .items(Joi.string().trim().lowercase().required())
  .min(1)
  .unique()
  .required();
