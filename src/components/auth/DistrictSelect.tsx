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

export function DistrictSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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
              <span className={cn(!value && "text-muted-foreground")}>
                {value ? UGANDA_DISTRICTS.find((d) => d === value) : "Select your district"}
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
                {UGANDA_DISTRICTS.map((district) => (
                  <CommandItem
                    key={district}
                    value={district}
                    onSelect={() => {
                      // use district directly — avoid onSelect's auto-lowercase
                      setValue(district === value ? "" : district);
                      setOpen(false);
                    }}
                  >
                    {district}
                    <Check
                      className={cn(
                        "ml-auto size-4",
                        value === district ? "opacity-100" : "opacity-0"
                      )}
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
