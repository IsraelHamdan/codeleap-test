export const formStyle = {
  formContainer: "flex flex-col gap-5 mt-5",
  // só o card branco
  formWrapper:
    "flex flex-col justify-start items-center w-[400px] md:w-[500px] min-h-[600px] p-10 rounded-lg bg-white shadow-md gap-6",

  heading: "text-4x1 font-bold text-gray-900 mb-6 font-poppins",

  inputWrapper: "w-full",
  fieldInput:
    "h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 dark:bg-slate-950 " +
    "placeholder:text-slate-500 shadow-xs transition-colors dark:border-slate-700 " +
    "dark:text-slate-100 dark:placeholder:text-slate-400 focus-visible:outline-none " +
    "focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/35 disabled:cursor-not-allowed disabled:opacity-60",
  label: "text-sm text-accent-foreground",
  textarea:
    "min-h-32 w-full rounded-md border border-slate-300 border-input bg-white px-3 text-sm text-slate-900 bg-transparent dark:bg-slate-950 " +
    "px-2.5 py-2 text-xs outline-none transition-colors" +
    "placeholder:text-slate-500 shadow-xs transition-colors dark:border-slate-700 focus-visible:border-ring" +
    "focus-visible:ring-1 focus-visible:ring-ring/50" +
    "disabled:pointer-events-none disabled:opacity-50",

  errorBorder: "border-red-500 focus:ring-red-500",
  errorMessage: "text-red-500 text-sm mt-1",

  forgotPassword: "text-sm font-semibold text-red-600 self-start",

  submitButton:
    "w-full rounded-md bg-[#1e2939] text-white text-lg font-bold py-4 hover:opacity-90 disabled:opacity-60",
};

const dashboardFieldBase =
  "w-full border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm transition-all duration-200 " +
  "placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-slate-400 focus-visible:ring-4 " +
  "focus-visible:ring-slate-200/70 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 " +
  "dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-slate-600 " +
  "dark:focus-visible:ring-slate-800/70";

const dashboardPillButtonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-60";

export const dashboardLayoutStyle = {
  stack: "flex flex-col gap-8",
  actionBar: "flex items-center",
};

export const dashboardFormStyle = {
  form: "space-y-6",
  fieldWrapper: "space-y-2",
  label:
    "text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400",
  input: `${dashboardFieldBase} h-11 rounded-xl py-3`,
  textarea: `${dashboardFieldBase} min-h-36 rounded-xl py-3.5 resize-none`,
  textareaCompact: `${dashboardFieldBase} min-h-32 rounded-xl py-3.5 resize-none`,
  inputError:
    "border-rose-300 focus-visible:border-rose-400 focus-visible:ring-rose-100 dark:border-rose-500/60 dark:focus-visible:border-rose-400 dark:focus-visible:ring-rose-500/15",
  error: "min-h-5 text-xs text-rose-500 dark:text-rose-400",
  actions: "flex justify-end pt-2",
  footer: "mt-auto flex items-center justify-end gap-2 pt-2",
};

export const dashboardButtonStyle = {
  primary:
    `${dashboardPillButtonBase} bg-slate-950 text-white shadow-lg shadow-slate-950/10 ` +
    "hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-950/15 " +
    "focus-visible:ring-slate-300 dark:bg-slate-100 dark:text-slate-900 dark:shadow-black/20 " +
    "dark:hover:bg-white dark:focus-visible:ring-slate-600",
  secondary:
    `${dashboardPillButtonBase} border border-slate-200 bg-white text-slate-700 ` +
    "hover:border-slate-300 hover:bg-slate-100 focus-visible:ring-slate-200 dark:border-slate-700 " +
    "dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 " +
    "dark:focus-visible:ring-slate-700",
  destructive:
    `${dashboardPillButtonBase} border border-rose-200 bg-rose-50 text-rose-600 ` +
    "hover:border-rose-300 hover:bg-rose-100 focus-visible:ring-rose-200 dark:border-rose-500/30 " +
    "dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20 dark:focus-visible:ring-rose-500/30",
  tall: "h-11 px-5 text-sm",
  regular: "h-10 px-4 text-sm",
  compact: "h-9 px-4 text-xs",
  wide: "min-w-36",
  form: "min-w-32",
};

export const dashboardIconStyle = {
  avatar: "size-7 shrink-0",
  nav: "size-[1.35rem] shrink-0",
  button: "size-[1.05rem] shrink-0",
  logout: "size-[1.15rem] shrink-0",
};

export const tableStyle = {
  container: "w-[1304px] relative",
  headerRow: "h-12 border-b border-zinc-500",
  headerCell: "text-sm font-semibold text-gray-700",
  headerCellLeft: "text-left",
  headerCellCenter: "text-center",
  headerCellRight: "text-right",

  body: "w-[1287px] h-[371px] relative",
  bodyRow: "h-[53px] border-b border-zinc-200 flex items-center",
  bodyCell: "text-[13.89px] font-medium text-[#09090b]",
  bodyCellLeft: "text-left",
  bodyCellCenter: "text-center",
  bodyCellRight: "text-right",

  paymentMethod: "text-sm text-left text-[#09090b]",
  paymentValue: "text-sm text-right text-[#09090b]",
};

export const cardStyle = {
  container: "flex flex-col mt-4",
  content: "flex flex-col gap-5",
};

export const badgeBase =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium";
