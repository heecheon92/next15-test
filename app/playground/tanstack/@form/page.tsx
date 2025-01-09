"use client";

import { useRenderCount } from "@/app/util/render";
import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";
import { ComponentProps, useState } from "react";

type SampleForm = {
  name: string;
  email: string;
  message: string;
};
export default function TanstackFormPage() {
  const renderCount = useRenderCount();
  const [submittedFormValue, setSubmittedFormValue] = useState<object>({});
  const form = useForm<SampleForm>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: ({ value }) => {
      setSubmittedFormValue(value);
    },
  });

  return (
    <div className="flex flex-col space-y-4 p-4 border-2 rounded-md">
      <header className="text-lg font-semibold">{`Tanstack Form (rendered ${renderCount} times)`}</header>

      <div className="flex flex-col space-y-2">
        <span>Submitted Form Object:</span>
        <pre>{JSON.stringify(submittedFormValue, null, 2)}</pre>
      </div>

      <form
        className="flex flex-col space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <ChildFormField<SampleForm>
          api={form}
          props={{
            name: "name",
          }}
        />

        <ChildFormField<SampleForm>
          api={form}
          props={{
            name: "email",
          }}
        />

        <ChildFormField<SampleForm>
          api={form}
          props={{
            name: "message",
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function ChildFormField<T>({
  api,
  props,
}: {
  api: ReactFormExtendedApi<T, undefined>;
  props: Omit<ComponentProps<typeof api.Field>, "children">;
}) {
  const renderCount = useRenderCount();
  return (
    <api.Field {...props}>
      {(field) => (
        <div className="flex flex-row space-x-4">
          <header>{`Child Form Field: ${props.name} (rendered ${renderCount} times)`}</header>
          <input
            value={field.state.value as string}
            onChange={(e) =>
              field.handleChange(
                e.target.value as Parameters<typeof field.handleChange>[0]
              )
            }
          />
        </div>
      )}
    </api.Field>
  );
}
