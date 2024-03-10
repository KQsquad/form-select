type EmitterEventMapI = {
    [k: string]: any
}

type EmitterEvent<M extends EmitterEventMapI> = keyof M
type EmitterEventListener<M extends EmitterEventMapI, E extends EmitterEvent<M>> = (payload: M[E]) => void
type EmitterEventMultiListener<M extends EmitterEventMapI, E extends EmitterEvent<M>> = {
    [K in E]: EmitterEventListener<M, K>
}

type EmitterEventListeners<M extends EmitterEventMapI> = {
    [K in keyof M]: Set<EmitterEventListener<M, K>>
}

class EventEmitter<M extends EmitterEventMapI> {
    private listeners: Partial<EmitterEventListeners<M>> = {}

    private getOrCreateListenerList<E extends EmitterEvent<M>>(event: E): EmitterEventListeners<M>[E] {
        let list = this.listeners[event]

        if (list) return list

        const newList = new Set<EmitterEventListener<M, E>>()
        this.listeners[event] = newList

        return newList
    }

    multiOn<E extends EmitterEvent<M>>(listeners: EmitterEventMultiListener<M, E>) {
        for (const event in listeners) {
            this.on(event, listeners[event])
        }
    }

    on<E extends EmitterEvent<M>>(event: E, listener: EmitterEventListener<M, E>) {
        const listenersList = this.getOrCreateListenerList(event)

        listenersList.add(listener)
    }

    off<E extends EmitterEvent<M>>(event: E, listener: EmitterEventListener<M, E>) {
        const listenersList = this.getOrCreateListenerList(event)

        listenersList.delete(listener)
    }

    emit<E extends EmitterEvent<M>>(event: E, payload: M[E]) {
        const listenersList = this.getOrCreateListenerList(event)

        listenersList.forEach(listener => {
            listener(payload)
        })
    }
}

export default EventEmitter