import { useForm } from "react-hook-form";
import type { ILogin, IRegister } from "../../types/user.interface";

interface IProps {
  type: "login" | "register";
}

export default function Form({ type }: IProps) {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<IRegister | ILogin>();

  const onSubmit = (data: IRegister | ILogin) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {type === "register" && (
        <>
          <input
            type="text"
            {...register("fullName")}
            placeholder="Full Name"
          />
          <input type="email" {...register("email")} placeholder="Email" />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
        </>
      )}
      {type === "login" && (
        <>
          <input {...register("email")} placeholder="Email" />
          <input {...register("password")} placeholder="Password" />
        </>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
