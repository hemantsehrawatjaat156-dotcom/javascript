
from typing import List


# arr = [3, 4, 7, 6, 5, 2]

# i=0
# j=len(arr)-1

# while i<j:
#   arr[i], arr[j] = arr[j], arr[i]
#   i +=1
#   j -=1

# print(arr)

# # without using any function reverse a array and check palindrome

# arr1 = [1, 2, 3, 2, 1]
 
# i=0
# j=len(arr1)-1

# while i<j:
#     arr1[i], arr1[j] = arr1[j], arr1[i]

#     i +=1
#     j -=1
#     i=j
# if arr1==arr1[::-1]:
#     print("Palindrome")
# else:
#     print("Not a Palindrome")
# print(arr1)


# # create a number by all arr inner number without using any function make single number

# arr2 =[3, 2, 4, 2, 3]

# num =""
# for digit in arr2:
#     num += str(digit)

# print(num)

# # create two array even index and odd index from given array

# arr3 = [5, 6, 7, 8, 9]
# even = [arr3[i] for i in range(len(arr3)) if i % 2 == 0]
# print(even)
# odd = [arr3[i] for i in range(len(arr3)) if i % 2 != 0]
# print(odd)

# # another method

# arr4 = [5, 6, 7, 8, 9]
# even_index = []
# odd_index = []
# for i in range(len(arr4)):
#     if i % 2 == 0:
#         even_index.append(arr4[i])
#     else:
#         odd_index.append(arr4[i])

# print("Even index array:", even_index)
# print("Odd index array:", odd_index)

# # count odd numbers and product of odd numbers in an array

# arr5 = [8, 3, 6, 2, 5, 1, 4, 7]
# count = 0
# product = 1
# for num in arr5:
#     if num % 2 != 0:
#         count += 1
#         product *= num
# print("Count of odd numbers:", count)
# print("Product of odd numbers:", product)

# # find maximum and second maximum number in an array

# arr6 =    [12, 15, 7, 10, 22, 9]
# max_num = arr6[0]
# for num in arr6:
#     if num > max_num:
#         max_num = num
# print("Maximum number in the array:", max_num)
# second_max = float('-inf')
# for num in arr6:
#     if num > second_max and num < max_num:
#         second_max = num
# print("second largest number in the array:", second_max)

# # FizzBuzz problem
# class Solution:

# def fizzBuzz(self, n: int) -> List[str]:
#         result = []
#         for i in range(1, n + 1):
#             if i % 3 == 0 and i % 5 == 0:
#                 result.append("FizzBuzz")
#             elif i % 3 == 0:
#                 result.append("Fizz")
#             elif i % 5 == 0:
#                 result.append("Buzz")
#             else:
#                 result.append(str(i))
#         return result


# class Solution:
#     def containsDuplicate(self, nums: List[int]) -> bool:
#         seen = set()
#         for num in nums:
#             if num in seen:
#                 return True
#             seen.add(num)
#         return False
    
from ast import List

# Definition for singly-linked list.

# class Solution:
#     def twoSum(self, nums: List[int], target: int) -> List[int]:
#         num_map = {}
#         for i, num in enumerate(nums):
#             complement = target - num
#             if complement in num_map:
#                 return [num_map[complement], i]
#             num_map[num] = i
#         return []
    
# # Definition for singly-linked list.
# class Solution:
#     def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        
#         dummy_head = ListNode(0)
#         current = dummy_head
#         carry = 0

#         while l1 or l2 or carry:
#             val1 = l1.val if l1 else 0
#             val2 = l2.val if l2 else 0

#             total = val1 + val2 + carry
#             carry = total // 10
#             current.next = ListNode(total % 10)
#             current = current.next

#             if l1:
#                 l1 = l1.next
#             if l2:
#                 l2 = l2.next

#         return dummy_head.next
    
# Anagram Check

# class Solution:
    # def isAnagram(self, s: str, t: str) -> bool:
    #     if len(s) != len(t):
    #         return False
        
    #     count_s = {}
    #     count_t = {}
        
    #     for char in s:
    #         count_s[char] = count_s.get(char, 0) + 1
            
    #     for char in t:
    #         count_t[char] = count_t.get(char, 0) + 1
            
    #     return count_s == count_t  

# n number of matrix

# class Solution:
#     def generateMatrix(self, n: int) -> List[List[int]]:
#         matrix = [[0] * n for _ in range(n)]
#         num = 1
#         left, right, top, bottom = 0, n - 1, 0, n - 1
        
#         while left <= right and top <= bottom:
#             for i in range(left, right + 1):
#                 matrix[top][i] = num
#                 num += 1
#             top += 1
            
#             for i in range(top, bottom + 1):
#                 matrix[i][right] = num
#                 num += 1
#             right -= 1
            
#             if top <= bottom:
#                 for i in range(right, left - 1, -1):
#                     matrix[bottom][i] = num
#                     num += 1
#                 bottom -= 1
            
#             if left <= right:
#                 for i in range(bottom, top - 1, -1):
#                     matrix[i][left] = num
#                     num += 1
#                 left += 1
        
#         return matrix

# m = int(input("Enter a number: "))
# n = int(input("Enter another number: "))

# matrix = [[0] * n for _ in range(m)]
# num = 1
# left, right, top, bottom = 0, n - 1, 0, m - 1
# while left <= right and top <= bottom:
#     for i in range(left, right + 1):
#         matrix[top][i] = num
#         num += 1
#     top += 1
    
#     for i in range(top, bottom + 1):
#         matrix[i][right] = num
#         num += 1
#     right -= 1
    
#     if top <= bottom:
#         for i in range(right, left - 1, -1):
#             matrix[bottom][i] = num
#             num += 1
#         bottom -= 1
    
#     if left <= right:
#         for i in range(bottom, top - 1, -1):
#             matrix[i][left] = num
#             num += 1
#         left += 1
##################
# class Node:
#     def __init__(self,data=None,next=None):
#         self.data=data
#         self.next=next
        
# class Linked_list:
#     def __init__(self,head=None):
#         self.head=head
        
        
#     def insert_at_Begining(self,data):
#         new_Node=Node(data,self.head)
#         self.head=new_Node


# class Node:
#     def __init__(self,data=None,next=None):
#         self.data=data
#         self.next=next     
# class Linked_list:
#     def __init__(self,head=None):
#         self.head=head    
#     def insert_at_Begining(self,data):
#         new_Node=Node(data,self.head)
#         self.head=new_Node
        


# print("hello welcome my viewers")

class Node:
    def __init__ (self, data = None, prev = None):
        self.data = data
        self.next = next
        self.prev = prev

class DLL:
    def __init__ (self, head = None):
        self.head = head

    def inssert_at_Begining(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            return
        temp = self.head
        while temp.next:
            temp = temp.next

        temp.next = new_node
        new_node.perv = temp

    def display(self):
        temp = self.head
        while temp.next:
            print(temp.data , end=" <-> ")
            temp = temp.next
        print("None")


l1 = DLL()
l1.inssert_at_Begining(100)
