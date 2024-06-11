import {
  Filter,
  IComponentBaseProps,
  IFilterProps,
  ISearchInputProps,
  SearchInput,
  cn,
  mp,
} from "@/shared";
import React from "react";

export interface IListProps<TItem> extends IComponentBaseProps {
  title: React.ReactNode;
  titleExtra?: React.ReactNode;
  search?: ISearchInputProps;
  filter?: IFilterProps;
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
  empty: React.ReactNode;
  /**
   * @default "row"
   */
  direction?: "row" | "column";
}

export const List = <TItem extends { id: React.Key }>(
  props: IListProps<TItem>
) => {
  const {
    titleExtra,
    search,
    filter,
    title,
    items,
    renderItem,
    empty,
    direction = "row",
  } = props;
  return mp(
    props,
    <div>
      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <h1 className="h1-bold text-dark100_light900">{title}</h1>

        {titleExtra}
      </div>

      <div className="mt-11 flex flex-wrap justify-between gap-5 max-sm:flex-col sm:items-center md:flex-col">
        {search &&
          mp(search, <SearchInput {...search} className="flex-1 md:w-full" />)}

        {filter && mp(filter, <Filter {...filter} className="md:w-full" />)}

        <div className="w-full">
          <div
            className={cn(
              "flex gap-4 flex-wrap",
              direction === "column" && "flex-col"
            )}
          >
            {items.length > 0
              ? items.map((item) => (
                  <React.Fragment key={item.id}>
                    {renderItem(item)}
                  </React.Fragment>
                ))
              : empty}
          </div>
        </div>
      </div>
    </div>
  );
};
