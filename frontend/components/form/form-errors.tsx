import { XCircle } from "lucide-react";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) {
    return null;
  }

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-sm text-red-300"
    >
      {errors?.[id]?.map((error: string) => (
        <div key={error} className="flex items-center gap-x-2">
          <XCircle className="h-4 w-4" />
          <p>{error}</p>
        </div>
      ))}
    </div>
  );
};