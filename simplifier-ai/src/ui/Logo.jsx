function Logo({ type }) {
  const base = "font-semibold cursor-pointer ";

  const styles = {
    primary: base + "text-2xl",
    small: base + "text-sm",
    home: base + "text-6xl sm:text-7xl",
  };

  return (
    <h2 className={styles[type]}>
      Plain<span className="text-indigo-600">Talk</span>
    </h2>
  );
}

export default Logo;
