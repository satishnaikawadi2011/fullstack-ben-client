import { Box, Button, Flex, Link } from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [{fetching:logoutFetching},logout] = useLogoutMutation()
    const [{data,fetching}] = useMeQuery({
        pause:isServer()
    })
    let body = null;
    if(fetching){
        
    }else if(!data?.me){
        body = <>
        	<NextLink href="/login">
					<Link mr={2}>Login</Link>
				</NextLink>

				<NextLink href="/register">
					<Link mr={2}>Register</Link>
				</NextLink>
        </>
    }else{
    body = <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button isLoading={logoutFetching} onClick={() => {logout()}} variant='link'>Logout</Button>
    </Flex>
    }
	return (
		<Flex bg="tan" p={4}>
			<Box ml="auto">
                {body}
			</Box>
		</Flex>
	);
};
