import useInView from "../hooks/useInView";

const variantClasses = {
  up: { init: "reveal-init", show: "reveal-show" },
  left: { init: "reveal-init-left", show: "reveal-show-x" },
  right: { init: "reveal-init-right", show: "reveal-show-x" },
  zoom: { init: "reveal-init-zoom", show: "reveal-show-zoom" },
};

export default function Reveal({ children, variant = "up", delay = 0, className = "", as: Tag = "div" }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const v = variantClasses[variant] || variantClasses.up;

  return (
    <Tag
      ref={ref}
      className={`${v.init} ${inView ? v.show : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
