interface TextFieldProps {
  value: string;
  loading?: boolean;
  required?: boolean;
  onChange?: (newValue: string) => void;
  placeholder?: string;
  styles: {
    everClassNames?: string;
    loadingClassNames?: string;
    nonLoadingClassNames?: string;
  }
}

export default function TextField({ loading, required, onChange, styles, ...rest }: TextFieldProps) {
  return (
    <input
      type="text"
      onChange={(e) => onChange?.(e.target.value)}
      className={`px-4 py-3 border rounded-lg  focus:outline-none focus:ring-2 transition-all ${styles.everClassNames} ${loading ? styles.loadingClassNames : styles.nonLoadingClassNames}`}
      disabled={!!loading}
      required={!!required}
      {...rest}
    />
  )
}
