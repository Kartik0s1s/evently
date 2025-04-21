 "use client";

import { useEffect, useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useRouter, useSearchParams } from "next/navigation";

import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Export select components
export const SelectItem = SelectPrimitive.Item;
export const SelectTrigger = SelectPrimitive.Trigger;
export const SelectContent = SelectPrimitive.Content;
export const SelectValue = SelectPrimitive.Value;
export const SelectRoot = SelectPrimitive.Root;

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        console.log("Fetched Categories:", categoryList); // Debugging line

        if (Array.isArray(categoryList)) {
          setCategories(categoryList);
        } else {
          console.error("getAllCategories() did not return an array:", categoryList);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <SelectPrimitive.Root onValueChange={onSelectCategory}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {categories.length > 0 ? (
  categories.map((category) => (
    <SelectItem
      key={category._id}
      value={category.name}
      className="select-item p-regular-14"
    >
      {category.name}
    </SelectItem>
  ))
) : (
  <SelectItem disabled className="select-item p-regular-14" value="no_categories">
    No categories found
  </SelectItem>
)}

      </SelectContent>
    </SelectPrimitive.Root>
  );
};

export default CategoryFilter;
