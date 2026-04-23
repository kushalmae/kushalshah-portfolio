import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { ArrowRight, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const inputClass =
  "w-full bg-transparent border-b border-line py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors";

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!site.formspreeEndpoint) {
      window.location.href = `mailto:${site.email}?subject=Inquiry from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(data.message)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 py-8">
        <CheckCircle size={20} className="text-primary" />
        <p className="text-foreground font-medium">Message sent.</p>
        <p className="text-sm text-muted-foreground">I'll get back to you within a few days.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="Name"
          autoComplete="name"
          className={cn(inputClass, errors.name && "border-destructive")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
          })}
          type="email"
          placeholder="Email"
          autoComplete="email"
          className={cn(inputClass, errors.email && "border-destructive")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("message", { required: "Message is required", minLength: { value: 20, message: "Message is too short" } })}
          placeholder="Message"
          rows={5}
          className={cn(inputClass, "resize-none", errors.message && "border-destructive")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">Something went wrong. Try emailing me directly.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
};

export default ContactForm;
