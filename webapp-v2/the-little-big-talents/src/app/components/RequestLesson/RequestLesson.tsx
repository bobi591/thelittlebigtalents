'use client';

import {
  Button,
  ButtonProps,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Select,
  createListCollection,
  useDisclosure,
} from '@chakra-ui/react';
import { lessons } from './lessons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';

const lessonTypes = Object.keys(lessons) as (keyof typeof lessons)[];

const lessonsCollection = createListCollection({
  items: lessonTypes.flatMap((lessonType) =>
    lessons[lessonType].map((lessonName) => ({ type: lessonType, lesson: lessonName })),
  ),
  itemToString: (item) => item.lesson,
  itemToValue: (item) => `${item.type} - ${item.lesson}`,
});

const schema = z.object({
  name: z.string().min(4, 'Името трябва да е поне 4 символа'),
  email: z.email('Невалиден email'),
  phone: z.string().regex(/^(?:\+359|0)8[7-9]\d{7}$/, 'Моля въведете валиден телефонен номер'),
  lesson: z.string().nonempty('Моля изберете урок'),
});

export type RequestLessonData = z.infer<typeof schema>;

const RequestLesson: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
  const { open, setOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestLessonData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: RequestLessonData) => {
      await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setOpen(false);
    },
    [setOpen],
  );

  const dialog = useMemo(() => {
    return (
      <Dialog.Root
        size="md"
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
        unmountOnExit
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Запиши Урок</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <Field.Root required invalid={!!errors.name}>
                        <Field.Label>
                          Име <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="Вашето име" {...register('name')} />
                        {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
                      </Field.Root>

                      <Field.Root required invalid={!!errors.email}>
                        <Field.Label>
                          Email <Field.RequiredIndicator />
                        </Field.Label>
                        <Input type="email" placeholder="Вашият email" {...register('email')} />
                        {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                      </Field.Root>

                      <Field.Root required invalid={!!errors.phone}>
                        <Field.Label>
                          Телефон <Field.RequiredIndicator />
                        </Field.Label>
                        <Input type="tel" placeholder="Вашият телефон" {...register('phone')} />
                        {errors.phone && <Field.ErrorText>{errors.phone.message}</Field.ErrorText>}
                      </Field.Root>

                      <Field.Root required invalid={!!errors.lesson}>
                        <Field.Label>
                          Урок <Field.RequiredIndicator />
                        </Field.Label>
                        <Select.Root name="lesson" collection={lessonsCollection}>
                          <Select.HiddenSelect {...register('lesson')} />
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Желан урок" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content zIndex="max">
                                {lessonTypes.map((lessonType) => (
                                  <Select.ItemGroup key={lessonType}>
                                    <Select.ItemGroupLabel>{lessonType}</Select.ItemGroupLabel>
                                    {lessons[lessonType].map((lesson) => (
                                      <Select.Item
                                        key={lesson}
                                        item={{ type: lessonType, lesson: lesson }}
                                      >
                                        {lesson} <Select.ItemIndicator />
                                      </Select.Item>
                                    ))}
                                  </Select.ItemGroup>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                        {errors.lesson && (
                          <Field.ErrorText>{errors.lesson.message}</Field.ErrorText>
                        )}
                      </Field.Root>
                    </Fieldset.Content>

                    <Button type="submit" alignSelf="flex-start" loading={isSubmitting}>
                      Изпрати
                    </Button>
                  </Fieldset.Root>
                </form>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }, [
    errors.email,
    errors.lesson,
    errors.name,
    errors.phone,
    handleSubmit,
    isSubmitting,
    onSubmit,
    open,
    register,
    setOpen,
  ]);

  return (
    <>
      <Button {...props} onClick={() => setOpen(!open)}>
        Запиши Урок
      </Button>
      {open === true ? dialog : null}
    </>
  );
};

export default RequestLesson;
