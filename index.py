
from typing import List


arr = [3, 4, 7, 6, 5, 2]

i=0
j=len(arr)-1

while i<j:
  arr[i], arr[j] = arr[j], arr[i]
  i +=1
  j -=1

print(arr)

# without using any function reverse a array and check palindrome

arr1 = [1, 2, 3, 2, 1]
 
i=0
j=len(arr1)-1

while i<j:
    arr1[i], arr1[j] = arr1[j], arr1[i]

    i +=1
    j -=1
    i=j
if arr1==arr1[::-1]:
    print("Palindrome")
else:
    print("Not a Palindrome")
print(arr1)


# create a number by all arr inner number without using any function make single number

arr2 =[3, 2, 4, 2, 3]

num =""
for digit in arr2:
    num += str(digit)

print(num)

# create two array even index and odd index from given array

arr3 = [5, 6, 7, 8, 9]
even = [arr3[i] for i in range(len(arr3)) if i % 2 == 0]
print(even)
odd = [arr3[i] for i in range(len(arr3)) if i % 2 != 0]
print(odd)

# another method

arr4 = [5, 6, 7, 8, 9]
even_index = []
odd_index = []
for i in range(len(arr4)):
    if i % 2 == 0:
        even_index.append(arr4[i])
    else:
        odd_index.append(arr4[i])

print("Even index array:", even_index)
print("Odd index array:", odd_index)

# count odd numbers and product of odd numbers in an array

arr5 = [8, 3, 6, 2, 5, 1, 4, 7]
count = 0
product = 1
for num in arr5:
    if num % 2 != 0:
        count += 1
        product *= num
print("Count of odd numbers:", count)
print("Product of odd numbers:", product)

# find maximum and second maximum number in an array

arr6 =    [12, 15, 7, 10, 22, 9]
max_num = arr6[0]
for num in arr6:
    if num > max_num:
        max_num = num
print("Maximum number in the array:", max_num)
second_max = float('-inf')
for num in arr6:
    if num > second_max and num < max_num:
        second_max = num
print("second largest number in the array:", second_max)

# FizzBuzz problem
class Solution:

def fizzBuzz(self, n: int) -> List[str]:
        result = []
        for i in range(1, n + 1):
            if i % 3 == 0 and i % 5 == 0:
                result.append("FizzBuzz")
            elif i % 3 == 0:
                result.append("Fizz")
            elif i % 5 == 0:
                result.append("Buzz")
            else:
                result.append(str(i))
        return result


class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False
    
    