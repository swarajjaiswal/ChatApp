import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserItem = ({user,handleFunction}) => {
  return (
    <Box
    px={2}
    py={1}
    borderRadius="lg"
    bg="pink"
    color="white"
    border="1px solid #E8E8E8"
    cursor="pointer"
    onClick={handleFunction}
    fontSize="12px"
    >
      {user.name}
      <CloseIcon pl={1}/>
    </Box>
  )
}

export default UserItem
