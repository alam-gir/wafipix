import { ChevronFirst, MoveLeft, MoveRight } from "lucide-react";
import { FC, FormEvent, useEffect, useState } from "react";
import Button2 from "./buttons/button2";
import { Input } from "../ui/input";
import { useQueryState } from "nuqs";

interface Props {
  totalPages: number;
  currentPage: number;
}

const Pagination: FC<Props> = ({ totalPages, currentPage }) => {
    
    const [page, setPage] = useQueryState("page");
    const [inputValue, setInputValue] = useState<string>(currentPage.toString());
    
  const isGotoFirstPageAvailable = currentPage > 2;
  const isPrevPageAvailable = currentPage > 1;
  const isNextPageAvailable = currentPage < totalPages;

  const goToFirstPage = () => {
    setPage(getPageNo({value: 1, totalPages}));
  };

  const goToNextPage = () => {
    if (currentPage >= totalPages) return;
    const pageNo = currentPage + 1;
    setPage(getPageNo({value: pageNo, totalPages}));
  };

  const goToPrevPage = () => {
    if (currentPage <= 1) return;
    const pageNo = currentPage - 1;
    setPage(getPageNo({value: pageNo, totalPages}));
  };

  const onBlurEnterHandle = (e: FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
    const value = parseInt(target.value);
    if(value > 0){
        setPage(getPageNo({value: value, totalPages}));
    } else setInputValue(currentPage.toString());
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const input = target.elements[0] as HTMLInputElement;
    setInputValue(input.value);

    const value = parseInt(input.value);
    if(value > 0){
        setPage(getPageNo({value: value, totalPages}));
    } else setInputValue(currentPage.toString());
  }

  const onChangeHandle = (e: FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  }


  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage])

  return (
    <div className="flex items-center justify-between py-3">
      {/* GO TO FIRST PAGE BUTTON */}
      <div className="">
        {isGotoFirstPageAvailable ? (
          <Button2
            onClick={goToFirstPage}
            title="Go to page 1"
            variant="ghost"
            className="text-accent3 bg-none hover:bg-accent3/5 hover:text-accent3/80"
            icon={<ChevronFirst />}
            iconPosition="left"
            hideText="mobile-tablet"
          />
        ) : null}
      </div>

      {/* GO TO PREVIOUS & NEXT PAGE BUTTON */}
      <div className="flex gap-4 flex-grow items-center w-full justify-center">
        <Button2
          onClick={goToPrevPage}
          disabled={!isPrevPageAvailable}
          title="Previous page"
          icon={<MoveLeft />}
          iconPosition="left"
          hideText="mobile-tablet"
        />
        <Button2
          onClick={goToNextPage}
          disabled={!isNextPageAvailable}
          title="Next page"
          icon={<MoveRight />}
          hideText="mobile-tablet"
        />
      </div>

      {/* PAGE INPUT FORM */}
      <div className="flex items-center justify-end gap-2 flex-nowrap ">
        <form onSubmit={handleSubmit}>
          <Input
            onSubmit={onBlurEnterHandle}
            onBlur={onBlurEnterHandle}
            onChange={onChangeHandle}
            type="number"
            value={inputValue}
            className="w-20 h-10 rounded-md border border-accent3 text-center bg-primary-foreground/60 lg:text-lg font-semibold text-primary/80"
          />
        </form>
        <p className="lg:text-lg font-semibold text-primary/80 tracking-wide text-nowrap">
          of <span>{totalPages}</span>
        </p>
      </div>
    </div>
  );
};

export default Pagination;


const getPageNo = ({value, totalPages}:{value: number, totalPages : number}) => {
  if(value <= 1) return "1";
  if(value >= totalPages) return totalPages.toString();
  return value.toString();
}