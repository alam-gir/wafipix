import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  ChangeEvent,
  FC,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

interface TagInputProps extends HTMLAttributes<HTMLInputElement> {
  onChangeHandle: (tags: string[]) => void;
  initialTags?: string[];
}

const TagInput: FC<TagInputProps> = ({ onChangeHandle, initialTags, ...props }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>(initialTags || []);

  const [isSuggestion, setSuggestions] = useState(false);

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    const currentTags = [...tags];

    if (value.includes(",")) {
      const newTags = value
        .trim()
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      newTags.forEach((tag) => currentTags.push(tag));

      if (ref?.current) ref.current.value = "";
    }

    onChangeHandle && onChangeHandle(currentTags);
    setTags(currentTags);

    if (value.trim() && tags.length === 0) setSuggestions(true);
  };

  const deleteHandle = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChangeHandle && onChangeHandle(newTags);
    setTags(newTags);

    // upate tags
  };

  // disable suggestion
  useEffect(() => {
    if (tags.length) setSuggestions(false);
  }, [tags]);
  return (
    <div className="space-y-2">
      <Input
        className="lg:text-lg"
        ref={ref}
        {...props}
        onChange={changeHandle}
        type="text"
        placeholder="Example- graphics,logo,banner"
      />
      {isSuggestion ? <TagSuggestion /> : null}

      <div className="w-full h-fit rounded lg:rounded-lg flex flex-wrap gap-2">
        {tags?.map((tag, index) => TagItem(tag, () => deleteHandle(index)))}
      </div>
    </div>
  );
};

export default TagInput;

const TagSuggestion = () => {
  return (
    <div className="bg-emerald-200 border border-emerald-500 rounded lg:rounded p-2 w-fit">
      <p className="text-emerald-500 font-semibold tracking-wide lg:text-lg italic">
        To set your tag put comma ',' after complete your tag.
      </p>
    </div>
  );
};

const TagItem = (tag: string, onDelete: () => void) => {
  return (
    <div className="flex gap-2 items-center group text-primary rounded lg:rounded-lg border border-primary/20 px-2">
      <p className="text-primary font-medium tracking-wide">{tag}</p>
      <X
        onClick={onDelete}
        className="cursor-pointer group-hover:bg-text-primary/80 text-primary duration-300 h-4 w-4"
      />
    </div>
  );
};
