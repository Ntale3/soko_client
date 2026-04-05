import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { C } from "@/constants/colors";
import { Ic } from "@/constants/crisp-svg";
import { UGANDA_DISTRICTS } from "@/constants/districts";
import { cn } from "@/lib/utils";
import { useSignUpStore } from "@/store/useSignUpStore";

export function DistrictSelect() {
  const [open, setOpen] = useState(false);
  const district = useSignUpStore((s) => s.district);
  const setDistrict = useSignUpStore((s) => s.setDistrict);

  return (
    <Field>
      <FieldLabel htmlFor="district">
        District <span className="text-destructive">*</span>
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="district"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-11 w-full justify-between font-normal"
          >
            <div className="flex items-center gap-2">
              <Ic n="map" s={16} c={C.muted} />
              <span className={cn(!district && "text-muted-foreground")}>
                {district ? UGANDA_DISTRICTS.find((d) => d === district) : "Select your district"}
              </span>
            </div>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search district..." />
            <CommandList className="max-h-64">
              <CommandEmpty>No district found.</CommandEmpty>
              <CommandGroup>
                {UGANDA_DISTRICTS.map((d) => (
                  <CommandItem
                    key={d}
                    value={d}
                    onSelect={() => {
                      // use district directly — avoid onSelect's auto-lowercase
                      setDistrict(d === district ? "" : d);
                      setOpen(false);
                    }}
                  >
                    {d}
                    <Check
                      className={cn("ml-auto size-4", district === d ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
