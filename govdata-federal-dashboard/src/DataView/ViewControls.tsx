import "./ViewControls.css";
import { ViewOptions } from "./DataView";

interface ViewControlsProps {
  viewOptions: ViewOptions;
  onChange: (options: ViewOptions) => void;
}

export const ViewControls: React.FC<ViewControlsProps> = ({
  viewOptions,
  onChange,
}) => {
  return (
    <div className="view-options">
      <label>
        <input
          type="checkbox"
          checked={viewOptions.showOnlyMinistries}
          onChange={(e) =>
            onChange({
              ...viewOptions,
              showOnlyMinistries: e.target.checked,
            })
          }
          data-testid="only-ministries"
        />
        Show only ministries
      </label>
      <label>
        <input
          type="checkbox"
          checked={viewOptions.hierarchy === "show"}
          onChange={(e) =>
            onChange({
              ...viewOptions,
              hierarchy: e.target.checked ? "show" : "ignore",
            })
          }
          data-testid="hierarchy"
        />
        Show departments, public-law institutions, and data catalogs under their
        supervising ministry (Note: This mapping is incomplete.)
      </label>
    </div>
  );
};
