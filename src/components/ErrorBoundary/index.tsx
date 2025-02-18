import { defineComponent, Fragment, onErrorCaptured, ref, unref } from "vue"

const props = {
  errorTemplate: {
    type: Function
  }
}

export const ErrorBoundary = defineComponent({
  name: "ErrorBoundary",
  props,
  setup(props, { slots }) {
    const state = ref<{
      hasError: boolean;
      error?: Error;
    }>({
      hasError: false,
    })


    const renderError = (e: Error) => {
      const { errorTemplate } = props;
      switch (e) {
        default:
          if (typeof errorTemplate === 'function') return errorTemplate(e);
          return errorTemplate ? errorTemplate : <h5>组件出错了，请核查后重试： {e.message}</h5>;
      }
    }


    onErrorCaptured((error: Error) => {
      state.value = {
        hasError: true,
        error
      }
    })

    return () => {
      if (unref(state).hasError) {
        return renderError(unref(state).error!)
      }

      return <Fragment>{slots.default?.()}</Fragment>
    }
  }
})