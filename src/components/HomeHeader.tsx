import { Heading, HStack, Text, VStack, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Avatar } from './Avatar'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRouterProps } from '@routes/app.routes'

export function HomeHeader() {
  const navigation = useNavigation<AppNavigatorRouterProps>()

  const handleNavigateToProfile = () => {
    navigation.navigate('profile')
  }

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={5} alignItems="center">
      <TouchableOpacity onPress={handleNavigateToProfile}>
        <Avatar
          size={12}
          source={{
            uri: 'https://avatars.githubusercontent.com/u/22012801?v=4',
          }}
          alt="Imagem do usuário"
          mr={4}
        />
      </TouchableOpacity>
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading
          color="gray.100"
          fontSize="md"
          fontWeight="bold"
          fontFamily="heading"
        >
          Rafael Silverio
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.100"
          ml="auto"
          size={6}
        />
      </TouchableOpacity>
    </HStack>
  )
}
