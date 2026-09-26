import random

# def factorial(n):
#     if n == 0:
#         return 1
#     else:
#         return n * factorial(n - 1)

# print(factorial(5))

# def power(n, p):
#     if p == 0:
#         return 1
#     else:
#         return n * power(n, p - 1)

# print(power(2, 3))
# month = 8
# day = 4
# match day:
#     # case 1 | 2 | 3  | 5  | 7:
    #     print("It's a weekday")
    #     print("Welcome")
    # case 4:
    #     print("It's a welcome day")
    # case _:
    #     print("It's a weekend")
    # case 1 | 2 | 3 | 4 | 5 if month <= 5:
    #     print("It's a weekday in summer")
    # case 1 | 2 | 3 | 4 | 5 if month <= 10:
    #     print("It's a weekday in winter")

# i = 6
# while i > 1:
#     print(i)
#     if i == 4:
#         continue
#     i -= 1
# i = 1
# while i < 6:
#     print(i)
#     i += 1
# else:
#     print("i is no longer less than 6")

# fruits = ["apple", "banana", "cherry"]
# for x in fruits:
#     print(x)

# for x in "banana":
#     print(x)

# fruits = ["apple", "banana", "cherry"]
# for x in fruits:
#     print(x)
#     if x == "banana":
#         break
# for x in range(6, 30, 4):
#     print(x)

# for x in range(6):
#     print(x)
#     if x == 3:
#         break
# else:
#     print("Finally finished!")

# adj = ["red", "big", "tasty"]
# fruits = ["apple", "banana", "cherry"]
# for x in adj:
#     for y in fruits:
#         print(x, y)

# for x in []:
#     pass

# def my_function():
#     print("hello  from a function")

# my_function()

# weight = 10

# def fruits_Price(Fruit):
#     fruits_Price = Fruit * 10 * weight
#     return fruits_Price

# print(fruits_Price(5))
# print(fruits_Price(10))
# print(fruits_Price(15))

# def fruit(price=10):
#     print(price * 10)

# fruit(150)
# fruit()

# def Man_Data(name = "na", age = 0, Father   = "na"):
#     print("Hello", name, age, Father)
# Man_Data("hem", 18, "shem")

# Man_Data(age = 18, Father = "shem", name = "hem")
# Man_Data()

# def fruit(price, weight = 10):
#     print("hi, price is" , price * weight)

# fruit(10)
# fruit(10, 100)
# fruit()

# for i in range(3, 10, 4):
#     print(i)

# print(list(range(3)))
# print(list(range(3, 10)))
# print(list(range(3, 10, 4)))

# r = range(10)

# print(r[2])
# print(r[:3])

# r = range(10)

# print(6 in r)
# print(7 in r)

# 2 x 2 by matrix code of start row and end row and start column and end column with any number repeating in code
# matrix = [
#     [1, 2, 3],
#     [4, 5, 6],
#     [7, 8, 9]
# ]

# numbers = [ x for row in matrix for x in row]

# # random.shuffle(numbers)
# column = []
# for i in range(len(matrix)):
#     column.append(matrix[i][column])



# # matrix  = [[numbers[j * 3 + i] for i in range(3)] for j in range(3)]

# print("shuffled matrix:")
# for row in matrix:
#     print(row)

# arr = [7, 8, 10, 6, 1, 20]
# minval = arr[0]

# for i in arr:
#     if i < minval:
#         minval = i

# print("Minimum value in the array is:", minval)

# //////////////////////////////////////////////////////////////////////////////////////////////////////////

# arr = [7, 8, 10, 6, 1, 20, 11]
# reverse_arr = arr[::-1]
# for i in range(len(arr)):
#     print(reverse_arr[i], end=" ")

# sorted_arr = sorted(arr)
# print(sorted_arr)

# decending_arr = sorted(arr, reverse = True)
# print(decending_arr)

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# arr = [7, 8, 10, 6, 1, 20, 11]
# Maxval = arr[0]
# for i in arr:
#     if i > Maxval:
#         Maxval = i
# print("Maximum value in the array is:", Maxval)

#//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# Arr = list(map(int, input("Array:"). split()))
# # print("Array:", Arr)
# print("want like that: 1.Maximun value, 2.Minimum value, 3.Sorted array, 4.Reverse array, 5.Decending array")
# Want = int(input("Want:"))

# if Want == 1:
#     maxval = Arr[0]
#     for i in Arr:
#         if i > maxval:
#             maxval = i
#     print("Maximum value in the array is:", maxval)
# elif Want == 2:
#     minval = Arr[0]
#     for i in Arr:
#         if i < minval:
#             minval = i
#     print("Minimum value in the array is:", minval)
# elif Want == 3:
#     sorted_arr = sorted(Arr)
#     print("Sorted array:", sorted_arr)
# elif Want == 4:
#     reverse_arr = Arr[::-1]
#     print("Reverse array:", reverse_arr)
# elif Want == 5:
#     decending_arr = sorted(Arr, reverse=True)
#     print("Decending array:", decending_arr)
# else: print("Invalid input. Please enter a number between 1 and 5.")

#/////////////////////////////////////////////////////////////////////
# num = [10, 4, 8, 3]
# sum = len(num)
# rightsum = sum - 1
# rightside = num[rightsum] + num[rightsum - 1] + num[rightsum - 2]
# print("Right side sum:", rightside)
# leftside = num[0] + num[1] + num[2]
# print("Left side sum:", leftside)
# arrleft = leftside - num[3] - num[2]
# print("Left side sum without middle element:", arrleft)
# arrright = rightside - num[0] -num[1]
# print("Right side sum without middle element:", arrright)
# # print(f"{leftside}{arrleft}{arrright}{rightside}")

# arr = [leftside, arrleft, arrright, rightside]
# print("Array:", arr)

#////////////////////////////////////////////////////////////////////////

arr = [1, 2, 3, 4, 1]

for i in arr:
    if arr[i] == arr[i]:
        # arr.append(arr[i])
        print(arr[i])
    elif arr[i] != arr[i]:
        arr.append(arr[i])
        