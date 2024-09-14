import Button2 from "@/components/global/buttons/button2";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { FC, useRef, useState } from "react";

interface AddFeatureFieldProps {
  onChange: (features: string[]) => void;
  initialFeatures?: string[];
}

const AddFeatureField: FC<AddFeatureFieldProps> = ({ onChange, initialFeatures = [] }) => {
  const ref = useRef<HTMLInputElement>(null);

  const [features, setFeatures] = useState<string[]>(initialFeatures);
  const [value, setValue] = useState<string>("");

  const removeHandle = (i: number) => {
    const newFeatures = features.filter((_, index) => index !== i);
    onChange(newFeatures);
    setFeatures(newFeatures);
  };

  const addHandle = (feature: string) => {
    const newFeatures = [...features];

    if(!feature) return;

    if (!newFeatures.includes(feature)) {
      newFeatures.push(feature);

      if (ref.current) {
        ref.current.value = "";
      }
    }
    onChange(newFeatures);
    setFeatures(newFeatures);
  };

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue(target.value);
  };

  console.log("rendering AddFeatureField", initialFeatures);

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {features?.map((feature, i) => (
          <FeatureItem
            key={i}
            feature={feature}
            onRemove={() => removeHandle(i)}
          />
        ))}
        <div className="flex gap-2">
          <Input
            ref={ref}
            onChange={changeHandle}
            type="text"
            placeholder="Add a feature"
            className="flex-grow lg:text-lg"
          />
          <Button2
            type="button"
            title="Add"
            onClick={() => addHandle(value)}
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default AddFeatureField;

const FeatureItem = ({
  feature,
  onRemove,
}: {
  feature: string;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center justify-between bg-white border-primary/20 border text-primary p-2 rounded lg:rounded-lg">
      <div className="flex items-center gap-2">
        <p className="lg:text-lg text-primary">{feature}</p>
      </div>

      <X
        onClick={onRemove}
        className="w-5 h-5 cursor-pointer hover:text-primary/80 text-primary duration-300"
      />
    </div>
  );
};
