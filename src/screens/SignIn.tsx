import { Center, Heading, Image, Text, VStack, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import LogoSvg from '@assets/logo.svg'
import BackGroundImg from '@assets/background.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { AuthNavigatorRouterProps } from '@routes/auth.routes'
import { useAuth } from '@hooks/useAuth'
import { Controller, useForm } from 'react-hook-form'
import { AppError } from '@utils/AppError'
import { useState } from 'react'

type FormData = {
  email: string
  password: string
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const toast = useToast()

  const navigation = useNavigation<AuthNavigatorRouterProps>()

  const handleNewAccount = () => {
    navigation.navigate('signUp')
  }

  const handleSignIn = async ({ email, password }: FormData) => {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Nao foi possível realizar o login. Tente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
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

        <Controller
          control={control}
          name="email"
          rules={{ required: 'Informe o e-mail' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: 'Informe a senha' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          title="Acessar"
          onPress={handleSubmit(handleSignIn)}
          isLoading={isLoading}
        />
      </Center>

      <Center mt={24}>
        <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
          Ainda não tem acesso?
        </Text>
        <Button
          title="Criar conta"
          variant="outline"
          onPress={handleNewAccount}
        />
      </Center>
    </VStack>
  )
}
