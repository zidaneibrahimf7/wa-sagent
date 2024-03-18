'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils";


export default function FilterData({ id, onChange }) {
  return (
    <Select id={id} onValueChange={onChange}>
      <SelectTrigger aria-controls='radix-:R8irb9j9:'  defaultValue='dateCreate' className="w-[240px] h-[39px]">
        <SelectValue placeholder='Date Created' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='dateCreate' selected>Date Created</SelectItem>
        <SelectItem value='dateProcess'>Process Date</SelectItem>
      </SelectContent>
    </Select>
  )
}