from more_itertools import first


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
