import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, Text, VStack } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import LogoSvg from '@assets/logo.svg'
import BackGroundImg from '@assets/background.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { AuthNavigatorRouterProps } from '@routes/auth.routes'

type FormDataTypeProps = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const formDefaultValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const SignUpSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  passwordConfirmation: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .oneOf([yup.ref('password'), null], 'Senhas não conferem'),
})

export function SignUp() {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataTypeProps>({
    defaultValues: formDefaultValues,
    resolver: yupResolver(SignUpSchema),
  })

  const navigation = useNavigation<AuthNavigatorRouterProps>()

  const handleSignIn = () => {
    navigation.navigate('signIn')
  }

  const onSubmit = (data: FormDataTypeProps) => {
    console.log(data)
    reset()
  }

  return (
    <VStack flex={1} bg="gray.700" px={5}>
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

      <Center flex={1}>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Crie sua conta
        </Heading>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirme  a Senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="send"
              error={errors.passwordConfirmation?.message}
            />
          )}
        />
      </Center>

      <Button title="Criar e acessar" onPress={handleSubmit(onSubmit)} />
      <Button
        title="Voltar para o login"
        variant="outline"
        mt={3}
        mb={8}
        onPress={handleSignIn}
      />
    </VStack>
  )
}
