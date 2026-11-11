def get_unit(prompt, valid_units, abb):
    while True:
        raw = input(prompt).strip().lower()
        unit = abb.get(raw, raw)  
        if unit in valid_units:
            return unit
        print("Invalid unit. Please try again.")


def get_value():
    while True:
        try:
            return float(input("Enter the amount: "))
        except ValueError:
            print("Invalid number. Please enter a numeric value.")


def to_grams(value, unit):
    if unit == "ounces":
        return value * 28.35
    elif unit == "pounds":
        return value * 453.592
    elif unit == "tons":
        return value * 907185
    elif unit == "grams":
        return value
    elif unit == "kilograms":
        return value * 1000
    elif unit == "metric tons":
        return value * 1_000_000


def from_grams(grams, unit):
    if unit == "ounces":
        return grams / 28.35
    elif unit == "pounds":
        return grams / 453.592
    elif unit == "tons":
        return grams / 907185
    elif unit == "grams":
        return grams
    elif unit == "kilograms":
        return grams / 1000
    elif unit == "metric tons":
        return grams / 1_000_000


def main():
    valid_units = ["ounces", "pounds", "tons", "grams", "kilograms", "metric tons"]

    abb = {
        "oz": "ounces",
        "oz.": "ounces",
        "ounce": "ounces",

        "lb": "pounds",
        "lbs": "pounds",
        "lb.": "pounds",
        "pound": "pounds",

        "ton": "tons",
        
        "g": "grams",
        "gram": "grams",

        "kg": "kilograms",
        "kilo": "kilograms",
        "kilos": "kilograms",
        "kilogram": "kilograms",

        "mt": "metric tons",
        "metric ton": "metric tons",
    }

    while True:
        print("\nMass Converter")
        print("You can type full units or abbreviations like: oz, lb, kg, g, mt")
        print("Units:", ", ".join(valid_units))

        from_unit = get_unit("Convert from: ", valid_units, abb)
        value = get_value()
        to_unit = get_unit("Convert to: ", valid_units, abb)

        grams = to_grams(value, from_unit)
        result = from_grams(grams, to_unit)

        print(f"\n{value} {from_unit} = {round(result, 3)} {to_unit}")

        again = input("\nWould you like to convert again? (yes/no): ").strip().lower()
        if again not in ["yes", "y"]:
            print("Goodbye!")
            break

main()