import { useTranslation } from "react-i18next";
import Title from "../../components/Title/Title";
import TextField from "../../components/Form/TextField";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SAVE_SETTING } from "../../graphql/mutations/Setting/saveSettingMutation";
import Button from "../../components/Button/Button";

const DeliveryCost = () => {
  const { t } = useTranslation(["setting"]);

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 });
  };

  const onError = () => toast.error(t("error_not_saved"), { duration: 2000 });

  const [mutate] = useMutation(SAVE_SETTING, {
    onCompleted,
    onError,
    // refetchQueries: [
    //   {
    //     query: GET_CATEGORY_LIST,
    //     variables: { page: 1 },
    //   },
    // ],
  });

  const validationSchema = () => {
    return Yup.object().shape({
      default: Yup.string().required(t("setting:default_required")),
      express: Yup.string().required(t("setting:express_required")),
    });
  };

  const formik = useFormik({
    initialValues: {} as any,
    validationSchema,
    onSubmit: (values) => {
      mutate({
        variables: {
          key: "delivery_cost",
          value: JSON.stringify(values),
        },
      });
    },
  });

  return (
    <main className="bg-white rounded-lg p-5 w-max">
      <Title title={t("setting:delivery_cost")} />

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-5">
        <div className="w-56">
          <TextField
            type="number"
            name="default"
            placeholder="20"
            label={t("setting:delivery_cost")}
            handleChange={formik.handleChange}
          />
        </div>

        <div className="w-56">
          <TextField
            type="number"
            name="express"
            placeholder="20"
            label={t("setting:express_delivery_cost")}
            handleChange={formik.handleChange}
          />
        </div>

        <Button type="submit">Save</Button>
      </form>

      {JSON.stringify(formik.values)}
    </main>
  );
};

export default DeliveryCost;
