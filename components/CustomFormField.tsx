"use client";
import { format } from "date-fns";
import { E164Number } from "libphonenumber-js/core";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

export const FormFieldType = {
  INPUT: "input",
  TEXTAREA: "textarea",
  PHONE_INPUT: "phoneInput",
  CHECKBOX: "checkbox",
  DATE_PICKER: "datePicker",
  SELECT: "select",
  SKELETON: "skeleton",
} as const;

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: (typeof FormFieldType)[keyof typeof FormFieldType];
}

const toTimeValue = (date?: Date) => {
  const value =
    date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();

  return `${String(value.getHours()).padStart(2, "0")}:${String(
    value.getMinutes()
  ).padStart(2, "0")}`;
};

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getMinimumAppointmentDate = () => {
  const minimumDate = new Date();
  minimumDate.setMinutes(minimumDate.getMinutes() + 1);
  minimumDate.setSeconds(0, 0);
  return minimumDate;
};

const mergeDateAndTime = (date: Date, time: string) => {
  const [hours = "0", minutes = "0"] = time.split(":");
  const nextDate = new Date(date);
  nextDate.setHours(Number(hours), Number(minutes), 0, 0);
  return nextDate;
};

const isSameDay = (date: Date, comparison: Date) =>
  date.getFullYear() === comparison.getFullYear() &&
  date.getMonth() === comparison.getMonth() &&
  date.getDate() === comparison.getDate();

const clampToFutureDate = (date: Date) => {
  const minimumDate = getMinimumAppointmentDate();

  return date.getTime() <= Date.now() && isSameDay(date, minimumDate)
    ? minimumDate
    : date;
};

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [open, setOpen] = useState(false);

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="GH"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      if (props.showTimeSelect) {
        const selectedDate =
          field.value instanceof Date ? field.value : new Date(field.value);
        const hasSelectedDate = !Number.isNaN(selectedDate.getTime());
        const timeValue = toTimeValue(selectedDate);

        return (
          <FormControl>
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_9rem]">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id={`${props.name}-date`}
                    className="shad-gray-btn h-11 w-full justify-between px-3 font-normal"
                  >
                    <span className="truncate">
                      {hasSelectedDate
                        ? format(selectedDate, "PPP")
                        : "Select date"}
                    </span>
                    <ChevronDownIcon className="size-4 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[calc(100vw-2rem)] max-w-[22rem] overflow-hidden border-dark-500 bg-dark-400 p-0 text-white sm:w-auto"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={hasSelectedDate ? selectedDate : undefined}
                    defaultMonth={hasSelectedDate ? selectedDate : undefined}
                    disabled={{ before: startOfToday() }}
                    onSelect={(date) => {
                      if (!date) return;

                      field.onChange(
                        clampToFutureDate(mergeDateAndTime(date, timeValue))
                      );
                      setOpen(false);
                    }}
                    className="mx-auto"
                  />
                </PopoverContent>
              </Popover>

              <Input
                type="time"
                id={`${props.name}-time`}
                step="60"
                value={timeValue}
                min={
                  hasSelectedDate && isSameDay(selectedDate, new Date())
                    ? toTimeValue(getMinimumAppointmentDate())
                    : undefined
                }
                onChange={(event) => {
                  const baseDate =
                    hasSelectedDate
                      ? selectedDate
                      : new Date();

                  field.onChange(
                    clampToFutureDate(
                      mergeDateAndTime(baseDate, event.target.value)
                    )
                  );
                }}
                className="shad-input appearance-none text-white [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </FormControl>
        );
      }

      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="user"
            className="ml-2"
          />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
