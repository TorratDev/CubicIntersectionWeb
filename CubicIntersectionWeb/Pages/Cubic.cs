namespace CubicIntersectionWeb.Pages;

public sealed class Cubic
{
    public Cubic()
    {
        Dimension = new Dimension();
        Center = new Center();
    }

    public Dimension Dimension { get; set; }
    public Center Center { get; set; }

    public override string ToString()
    {
        return $"{{ Dimension: {Dimension}, Center: {Center} }}";
    }
}

public sealed class Dimension
{
    public Dimension()
    {
        X = 1;
        Y = 1;
        Z = 1;
    }

    public double X { get; set; }
    public double Y { get; set; }
    public double Z { get; set; }

    public override string ToString()
    {
        return $"{{ {X}, {Y}, {Z} }}";
    }
}

public sealed class Center
{
    public Center()
    {
        X = 0.75;
        Y = 0.75;
        Z = 0.75;
    }

    public double X { get; set; }
    public double Y { get; set; }
    public double Z { get; set; }

    public override string ToString()
    {
        return $"{{ {X}, {Y}, {Z} }}";
    }
}