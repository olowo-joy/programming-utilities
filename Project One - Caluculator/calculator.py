print("Simple Calculator".center(50, "-"))
print("Hello! This is a simple calculator.")

while True:
    function = input("Select operation -\n1. Addition\n2. Subtraction\n3. Multiplication\n4. Division\n5. Exit\n").strip()

    print("\n")
    def calculator(function):
        match function: 
            case "1":
                print("1 - Addition")
                try:
                    num1, num2 = map(float, input('Enter two numbers separated by a space: ').split())
                except ValueError:
                    print("Please enter valid numbers.\n")
                    return True
                print(f"The sum of {num1} and {num2} is {num1 + num2}.")
                print("".center(50, "-"))
            case "2":
                print("2 - Subtraction")
                try:
                    num1 = float(input("Enter a number: "))
                    num2 = float(input("Enter another number: "))
                except ValueError:
                    print("Please enter valid numbers.\n")
                    return True
                print(num1 - num2)
                print("".center(50, "-"))
            case "3":
                print("3 - Multiplication")
                try: 
                    num1, num2 = map(float, input('Enter two numbers separated by a space: ').split())
                except ValueError:
                    print("Please enter valid numbers.\n")
                    return True
                print(f"The product of {num1} and {num2} is {num1 * num2}.")
                print("".center(50, "-"))
            case "4":
                print("4 - Division")
                try:
                    num1 = float(input("Enter your first number: "))
                    num2 = float(input("Enter number you want to divide by: "))
                except ValueError:
                    print("Please enter valid numbers.\n")
                    return True

                if num2 == 0:
                    print("Error: You can't divide by zero.")
                else:
                    result = num1 / num2
                    print("The answer is:", result)
                print("".center(50, "-"))
            case "5":
                print("Thank you! Goodbye!".center(50, "-"))
                return False
            case _:
                print("Invalid input")
                print("".center(50, "-"))
        return True
    
    if not calculator(function):
        break