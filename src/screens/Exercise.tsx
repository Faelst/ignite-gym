import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRouterProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepsSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRouterProps>()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px={5} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack my={4} alignItems="center" justifyContent="space-between">
          <Heading
            color="gray.100"
            fontSize="lg"
            fontWeight="bold"
            flexShrink={1}
          >
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.100" fontSize="sm" ml={1}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView> 
        <VStack p={5}>
          <Image
            w="full"
            h={80}
            source={{
              uri: 'https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-remada-unilateral-com-halter-serrote-no-banco.gif',
            }}
            alt="Imagem do exercício"
            mb={4}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" p={5} rounded="lg">
            <HStack
              alignItems="center"
              justifyContent="space-between"
              px={6}
              my={3}
            >
              <HStack alignItems="center">
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  3 Series
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepsSvg />
                <Text color="gray.200" ml={2}>
                  12 Repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" mt={4} />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
