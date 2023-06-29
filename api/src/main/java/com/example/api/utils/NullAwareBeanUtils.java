package com.example.api.utils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.stream.Stream;

public class NullAwareBeanUtils {
    public static void copyNonNullProperties(Object source, Object target) {
        Arrays.stream(source.getClass().getDeclaredFields())
                .filter(field -> {
                    try {
                        PropertyDescriptor propertyDescriptor = new PropertyDescriptor(field.getName(), source.getClass());
                        Object propertyValue = propertyDescriptor.getReadMethod().invoke(source);
                        return propertyValue != null;
                    } catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
                        e.printStackTrace();
                        return false;
                    }
                })
                .forEach(field -> {
                    try {
                        PropertyDescriptor sourcePropertyDescriptor = new PropertyDescriptor(field.getName(), source.getClass());
                        PropertyDescriptor targetPropertyDescriptor = new PropertyDescriptor(field.getName(), target.getClass());
                        Object propertyValue = sourcePropertyDescriptor.getReadMethod().invoke(source);
                        targetPropertyDescriptor.getWriteMethod().invoke(target, propertyValue);
                    } catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
                        e.printStackTrace();
                    }
                });
    }
}
