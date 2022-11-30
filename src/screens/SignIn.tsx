import { Center, Heading, Image, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import LogoSvg from '@assets/logo.svg'
import BackGroundImg from '@assets/background.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { AuthNavigatorRouterProps } from '@routes/auth.routes'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRouterProps>()

  const handleSignUp = () => {
    navigation.navigate('signUp')
  }

  return (
    <VStack flex={1} px={5}>
      <Image
        source={BackGroundImg}
        defaultSource={BackGroundImg}
        alt="Pessoas Treinando"
        resizeMode="contain"
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />

        <Text fontSize="sm" color="gray.100">
          Treine sua mente e o seu corpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>

        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input placeholder="Senha" secureTextEntry />

        <Button title="Acessar" />
      </Center>

      <Center mt={24}>
        <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
          Ainda não tem acesso?
        </Text>
        <Button title="Criar conta" variant="outline" onPress={handleSignUp} />
      </Center>
    </VStack>
  )
}
