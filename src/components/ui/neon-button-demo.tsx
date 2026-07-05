import { NeonButton } from "@/components/ui/neon-button"

const Default = () => {
    return (
        <div className="flex flex-col gap-3">
            <NeonButton>Button</NeonButton>
            <WithNoNeon />
            <Solid />
        </div>
    )
}

const WithNoNeon = () => {
    return (
        <div className="flex flex-col gap-2">
            <NeonButton neon={false}>normal button</NeonButton>
        </div>
    )
}

const Solid = () => {
    return (
        <div className="flex flex-col gap-2">
            <NeonButton variant={"solid"}>solid</NeonButton>
        </div>
    )
}

export { Default, WithNoNeon, Solid }
