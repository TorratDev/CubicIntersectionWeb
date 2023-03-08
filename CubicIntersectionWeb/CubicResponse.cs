using System.Runtime.Serialization;

namespace CubicIntersectionWeb;

[DataContract]
public class CubicResponse
{
    public CubicResponse()
    {
    }

    internal CubicResponse(double intersectedVolume)
    {
        IntersectedVolume = intersectedVolume;
        AreTheyColliding = intersectedVolume > 0;
    }

    [DataMember(Order = 1)] public bool AreTheyColliding { get; set; }

    [DataMember(Order = 2)] public double IntersectedVolume { get; set; }
}