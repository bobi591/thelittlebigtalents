import { Button, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

const Page: React.FC = () => {
    return (
        <Stack alignContent={'center'} justifyContent={'center'} h={'50vh'} alignItems={'center'} gap={'3'}>
            <Text>В момента страницата не е налична.</Text>
                  <Link href="/" passHref>
                    <Button variant={'outline'}>Към началната страница</Button>
                </Link>
        </Stack>
    )
}

export default Page;